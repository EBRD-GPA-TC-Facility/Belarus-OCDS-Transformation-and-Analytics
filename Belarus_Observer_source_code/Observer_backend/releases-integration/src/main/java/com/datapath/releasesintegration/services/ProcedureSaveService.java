package com.datapath.releasesintegration.services;

import com.datapath.persistence.entities.*;
import com.datapath.persistence.repositories.*;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Slf4j
@Service
public class ProcedureSaveService {

    private static final String RELEASE_API = "releases-api";

    private OKRBRepository okrbRepository;
    private PartyRepository partyRepository;
    private TenderRepository tenderRepository;
    private DepartmentRepository departmentRepository;
    private ProcedureTypeRepository procedureTypeRepository;
    private ClassificationRepository classificationRepository;

    public ProcedureSaveService(TenderRepository tenderRepository,
                                PartyRepository partyRepository,
                                DepartmentRepository departmentRepository,
                                ProcedureTypeRepository procedureTypeRepository,
                                ClassificationRepository classificationRepository,
                                OKRBRepository okrbRepository) {
        this.partyRepository = partyRepository;
        this.tenderRepository = tenderRepository;
        this.departmentRepository = departmentRepository;
        this.procedureTypeRepository = procedureTypeRepository;
        this.classificationRepository = classificationRepository;
        this.okrbRepository = okrbRepository;
    }


    private Map<String, Classification> getClassificationsMap(Tender tender) {
        Map<String, Classification> resultMap = new HashMap<>();
        tender.getContracts().forEach(contract ->
                contract.getItems().forEach(contractItem -> {
                            if (nonNull(contractItem.getClassification()))
                                resultMap.put(contractItem.getClassification().getClassificationId(), contractItem.getClassification());
                        }
                ));
        tender.getAwards().forEach(award ->
                award.getItems().forEach(awardItem -> {
                    if (nonNull(awardItem.getClassification()))
                        resultMap.put(awardItem.getClassification().getClassificationId(), awardItem.getClassification());
                }));

        tender.getItems().forEach(tenderItem -> {
                    if (nonNull(tenderItem.getClassification()))
                        resultMap.put(tenderItem.getClassification().getClassificationId(), tenderItem.getClassification());
                }
        );


        resultMap.forEach((classificationId, classification) -> {

            String id = classification.getClassificationId().replaceAll("[^\\d]", "");
            Optional<OKRB> optionalOkrb = okrbRepository.findbyClearCodeEquals(id);
            optionalOkrb.ifPresent(classification::setOkrb);

            Classification existedClassification = classificationRepository
                    .getFirstByClassificationIdEquals(classificationId).orElse(classification);
            existedClassification.setClassificationDescription(classification.getClassificationDescription());
            resultMap.put(classificationId, existedClassification);
        });
        return resultMap;
    }


    private Map<String, Party> getPartiesMap(Tender tender) {
        Map<String, Party> partiesMap = new HashMap<>();
        Map<String, Party> resultMap = new HashMap<>();

        tender.getBids().forEach(bid -> partiesMap.put(bid.getTenderer().getOuterId(), bid.getTenderer()));
        tender.getAwards().forEach(award -> partiesMap.put(award.getWinner().getOuterId(), award.getWinner()));
        tender.getContracts().forEach(contract -> partiesMap.put(contract.getSupplier().getOuterId(), contract.getSupplier()));
        if (nonNull(tender.getProcuringEntity()))
            partiesMap.put(tender.getProcuringEntity().getOuterId(), tender.getProcuringEntity());

        partiesMap.forEach((partyId, party) -> {

            if (nonNull(party.getDepartmentId())) {
                party.setDepartment(departmentRepository.findById(party.getDepartmentId()).orElse(null));
            }

            Party existedParty;

            if (!partyId.isEmpty()) {
                existedParty = partyRepository
                        .getFirstByOuterIdEquals(partyId)
                        .orElse(null);
            } else {
                existedParty = partyRepository
                        .getFirstByNameEquals(party.getName())
                        .orElse(null);
            }
            if (nonNull(existedParty)) {
                if (nonNull(party.getName())) existedParty.setName(party.getName());
                if (nonNull(party.getEmail())) existedParty.setEmail(party.getEmail());
                if (nonNull(party.getRegion())) existedParty.setRegion(party.getRegion());
                if (nonNull(party.getCountry())) existedParty.setCountry(party.getCountry());
                if (nonNull(party.getResident())) existedParty.setResident(party.getResident());
                if (nonNull(party.getLocality())) existedParty.setLocality(party.getLocality());
                if (nonNull(party.getIsCapital())) existedParty.setIsCapital(party.getIsCapital());
                if (nonNull(party.getTelephone())) existedParty.setTelephone(party.getTelephone());
                if (nonNull(party.getPostalCode())) existedParty.setPostalCode(party.getPostalCode());
                if (nonNull(party.getDepartment())) existedParty.setDepartment(party.getDepartment());
                if (nonNull(party.getStreetAddress())) existedParty.setStreetAddress(party.getStreetAddress());
                if (nonNull(party.getUrl())) existedParty.setUrl(party.getUrl());
                resultMap.put(partyId, existedParty);
            } else {
                resultMap.put(partyId, party);
            }

        });
        return resultMap;
    }

    private Tender updateTender(Tender tender) {

        Map<String, Party> partiesMap = getPartiesMap(tender);
        Map<String, Classification> classificationsMap = getClassificationsMap(tender);

        if (!tender.getContracts().isEmpty()) {
            tender.getContracts().forEach(contract -> {
                Party buyer = partiesMap.get(contract.getBuyer().getOuterId());
                contract.setBuyer(buyer);

                Party supplier = partiesMap.get(contract.getSupplier().getOuterId());
                contract.setSupplier(supplier);

                contract.getItems().forEach(item -> {
                    if (nonNull(item.getClassification())) {
                        Classification classification = classificationsMap.get(item.getClassification().getClassificationId());
                        item.setClassification(classification);
                    }
                });
            });
        }
        tender.getAwards().forEach(award -> {
            Party winner = partiesMap.get(award.getWinner().getOuterId());
            award.setWinner(winner);

            award.getItems().forEach(item -> {
                if (nonNull(item.getClassification())) {
                    Classification classification = classificationsMap.get(item.getClassification().getClassificationId());
                    item.setClassification(classification);
                }
            });
        });


        tender.getBids().forEach(bid -> {
            Party tenderer = partiesMap.get(bid.getTenderer().getOuterId());
            bid.setTenderer(tenderer);
        });

        tender.getItems().forEach(item -> {
            Classification classification = classificationsMap.get(item.getClassification().getClassificationId());
            item.setClassification(classification);
        });

        if (nonNull(tender.getProcuringEntity()))
            tender.setProcuringEntity(partiesMap.get(tender.getProcuringEntity().getOuterId()));

        if (nonNull(tender.getProcedureType())) {
            String procedureTypeName = tender.getProcedureType().getNameEn();
            Optional<ProcedureType> procedureTypeByNameEnOptional = procedureTypeRepository
                    .getProcedureTypeByNameEn(procedureTypeName);
            procedureTypeByNameEnOptional.ifPresent(tender::setProcedureType);
        }
        Optional<Tender> existedOptionalTender = tenderRepository.getFirstByTenderIdEquals(tender.getTenderId());


        if (existedOptionalTender.isPresent()) {
            Tender existedTender = existedOptionalTender.get();
            log.info("Update tender {}", existedTender.getId());
            existedTender.setOrigin(tender.getOrigin());
            existedTender.setTitle(tender.getTitle());
            existedTender.setStatus(tender.getStatus());
            existedTender.setAmount(tender.getAmount());
            existedTender.setSource(tender.getSource());
            existedTender.setCurrency(tender.getCurrency());
            existedTender.setIndustry(tender.getIndustry());
            existedTender.setProcurementMethod(tender.getProcurementMethod());
            existedTender.setProcurementMethodDetails(tender.getProcurementMethodDetails());
            existedTender.setIsCompetitive(tender.getIsCompetitive());

            existedTender.setDate(tender.getDate());
            existedTender.setDatePublished(tender.getDatePublished());
            existedTender.setTenderPeriodEndDate(tender.getTenderPeriodEndDate());
            existedTender.setTenderPeriodStartDate(tender.getTenderPeriodStartDate());
            existedTender.setDateCreated(tender.getDateCreated());

            existedTender.setData(tender.getData());
            existedTender.getBids().clear();
            existedTender.getBids().addAll(tender.getBids());
            existedTender.getLots().clear();
            existedTender.getLots().addAll(tender.getLots());
            existedTender.getAwards().clear();
            existedTender.getAwards().addAll(tender.getAwards());
            existedTender.getItems().clear();
            existedTender.getItems().addAll(tender.getItems());
            existedTender.getDocuments().clear();
            existedTender.getDocuments().addAll(tender.getDocuments());
            existedTender.getContracts().clear();
            existedTender.getContracts().addAll(tender.getContracts());
            existedTender.setProcuringEntity(tender.getProcuringEntity());
            existedTender.setProcedureType(tender.getProcedureType());

            return existedTender;
        }
        return tender;
    }

    @Transactional
    @Synchronized
    public Tender saveTender(Tender tender) {

        Tender newTender = updateTender(tender);

        newTender.getBids().forEach(bid -> newTender.getLots().forEach(lot -> {
            if (nonNull(bid.getRelatedLot()) && bid.getRelatedLot().equals(lot.getLotId())) bid.setLot(lot);
            bid.setTender(newTender);
        }));

        newTender.getItems().forEach(tenderItem -> newTender.getLots().forEach(lot -> {
            if (nonNull(tenderItem.getRelatedLot()) && tenderItem.getRelatedLot().equals(lot.getLotId())) {
                tenderItem.setLot(lot);
            }
        }));
        newTender.getAwards().forEach(award -> award.getItems().forEach(awardItem -> newTender.getLots().forEach(lot -> {
            if (nonNull(awardItem.getRelatedLot()) && awardItem.getRelatedLot().equals(lot.getLotId())) {
                awardItem.setLot(lot);
            }
        })));

        newTender.getLots().forEach(lot -> lot.setTender(newTender));
        newTender.getItems().forEach(item -> item.setTender(newTender));
        newTender.getAwards().forEach(award -> award.setTender(newTender));
        newTender.getEnquiries().forEach(enquiry -> enquiry.setTender(newTender));
        newTender.getContracts().forEach(contract -> contract.setTender(newTender));
        newTender.getDocuments().forEach(document -> document.setTender(newTender));

        newTender.getData().setTender(newTender);

        return tenderRepository.save(newTender);
    }


}
